
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCollection, useFirestore, useMemoFirebase, addDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking, useFirebaseApp } from '@/firebase';
import { collection, doc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash, Edit, Copy } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const PRESET_COLORS = [
    { name: 'Black', hex: '#111827' }, { name: 'White', hex: '#FFFFFF' },
    { name: 'Stone', hex: '#A8A29E' }, { name: 'Gray', hex: '#6B7280' },
    { name: 'Red', hex: '#EF4444' }, { name: 'Pink', hex: '#EC4899' },
    { name: 'Blue', hex: '#3B82F6' }, { name: 'Sky', hex: '#0EA5E9' },
    { name: 'Green', hex: '#22C55E' }, { name: 'Lime', hex: '#84CC16' },
    { name: 'Yellow', hex: '#EAB308' }, { name: 'Orange', hex: '#F97316' },
    { name: 'Brown', hex: '#78350F' }, { name: 'Beige', hex: '#F5F5DC' },
    { name: 'Purple', hex: '#8B5CF6' }, { name: 'Indigo', hex: '#6366F1' },
];

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  
  category: z.enum(['women', 'men', 'children', 'bags']),
  style: z.enum(['casual', 'streetwear', 'formal', 'vintage', 'minimal']),
  
  price: z.coerce.number().min(0, 'Price must be positive'),
  originalPrice: z.coerce.number().optional().nullable(),

  imageUrl1: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  imageUrl2: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  imageUrl3: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  imageUrl4: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  
  sizes: z.array(z.string()).optional(),
  availableColors: z.array(z.object({ name: z.string(), hex: z.string() })).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AdminDashboard() {
  const firestore = useFirestore();
  const productsQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'products') : null),
    [firestore]
  );
  const { data: products, isLoading } = useCollection<Product>(productsQuery);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { toast } = useToast();
  const firebaseApp = useFirebaseApp();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      category: 'women',
      style: 'casual',
      price: 0,
      originalPrice: null,
      imageUrl1: '',
      imageUrl2: '',
      imageUrl3: '',
      imageUrl4: '',
      sizes: [],
      availableColors: [],
    },
  });

  const nameValue = form.watch('name');
  React.useEffect(() => {
    if (!editingProduct && nameValue) {
      const generatedSlug = nameValue
        .toLowerCase()
        .trim()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      form.setValue('slug', generatedSlug, { shouldValidate: true });
    }
  }, [nameValue, editingProduct, form.setValue]);
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !firebaseApp) return;

    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);
    setUploadedUrl(null);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
        },
        (error) => {
            console.error("Upload failed", error);
            toast({
                variant: "destructive",
                title: "Upload Failed",
                description: error.message,
            });
            setUploading(false);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setUploadedUrl(downloadURL);
                setUploading(false);

                const imageFields: ('imageUrl1' | 'imageUrl2' | 'imageUrl3' | 'imageUrl4')[] = ['imageUrl1', 'imageUrl2', 'imageUrl3', 'imageUrl4'];
                const currentValues = form.getValues();
                const firstEmptyField = imageFields.find(field => !currentValues[field] || currentValues[field] === '');
                
                if (firstEmptyField) {
                    form.setValue(firstEmptyField, downloadURL, { shouldValidate: true });
                    toast({
                        title: "Upload Complete!",
                        description: `Image URL has been auto-filled. You can also copy it.`,
                    });
                } else {
                    toast({
                        title: "Upload Complete!",
                        description: "All image fields are full. You can copy the URL manually.",
                    });
                }
            });
        }
    );
};

  const copyUrlToClipboard = () => {
    if (!uploadedUrl) return;
    navigator.clipboard.writeText(uploadedUrl);
    toast({
        title: "Copied to Clipboard!",
    });
  };

  React.useEffect(() => {
    if (editingProduct) {
      form.reset({
        name: editingProduct.name,
        slug: editingProduct.slug,
        description: editingProduct.description,
        category: editingProduct.category,
        style: editingProduct.style,
        price: editingProduct.price,
        originalPrice: editingProduct.originalPrice,
        imageUrl1: editingProduct.images?.[0]?.url || '',
        imageUrl2: editingProduct.images?.[1]?.url || '',
        imageUrl3: editingProduct.images?.[2]?.url || '',
        imageUrl4: editingProduct.images?.[3]?.url || '',
        sizes: editingProduct.sizes || [],
        availableColors: editingProduct.availableColors || [],
      });
    } else {
      form.reset();
    }
  }, [editingProduct, form]);

  const onSubmit = (data: ProductFormData) => {
    if (!firestore) return;
    
    const images = [data.imageUrl1, data.imageUrl2, data.imageUrl3, data.imageUrl4]
        .filter((url): url is string => !!url)
        .map(url => ({ url, alt: data.name, hint: 'product image' }));
    
    const productData = {
      name: data.name,
      slug: data.slug,
      price: data.price,
      originalPrice: data.originalPrice || null,
      description: data.description,
      category: data.category,
      style: data.style,
      sizes: data.sizes,
      availableColors: data.availableColors,
      images: images,
      updatedAt: serverTimestamp(),
    };

    if (editingProduct) {
      const productRef = doc(firestore, 'products', editingProduct.id);
      updateDocumentNonBlocking(productRef, productData);
    } else {
      addDocumentNonBlocking(collection(firestore, 'products'), { ...productData, createdAt: serverTimestamp() });
    }
    
    setIsDialogOpen(false);
    setEditingProduct(null);
  };
  
  const handleDelete = (productId: string) => {
    if (!firestore) return;
    if (window.confirm('Are you sure you want to delete this product?')) {
        const productRef = doc(firestore, 'products', productId);
        deleteDocumentNonBlocking(productRef);
    }
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  }
  
  const openNewDialog = () => {
    setEditingProduct(null);
    form.reset();
    setIsDialogOpen(true);
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={openNewDialog}>Add New Product</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product Wizard' : 'New Product Wizard'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-4">
              
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              
              <FormField control={form.control} name="slug" render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Slug</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">Classification</h3>
                <div className="space-y-4">
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page / Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="men">Men</SelectItem>
                          <SelectItem value="women">Women</SelectItem>
                          <SelectItem value="children">Unisex</SelectItem>
                          <SelectItem value="bags">Bags</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="style" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Style / Sub-category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="streetwear">Streetwear</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                          <SelectItem value="vintage">Vintage</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}/>
                </div>
              </div>

              <Separator />

               <div>
                <h3 className="text-lg font-semibold mb-4">Pricing</h3>
                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="originalPrice" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Original Price (Optional)</FormLabel>
                        <FormControl><Input type="number" {...field} value={field.value ?? ''} onChange={e => field.onChange(e.target.value === '' ? null : parseFloat(e.target.value))} placeholder="e.g., 2000" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}/>
                    <FormField control={form.control} name="price" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sale Price</FormLabel>
                        <FormControl><Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}/>
                </div>
              </div>

               <Separator />

               <div>
                <h3 className="text-lg font-semibold mb-2">Quick Image Uploader</h3>
                <p className="text-xs text-muted-foreground mb-4">
                    Upload an image to Firebase Storage, then copy the URL and paste it into the media fields below.
                </p>
                <div className="space-y-4 p-4 border rounded-lg">
                    <FormItem>
                        <FormLabel>Upload Photo</FormLabel>
                        <FormControl>
                            <Input type="file" accept="image/webp, image/jpeg, image/png" onChange={handleImageUpload} disabled={uploading} />
                        </FormControl>
                    </FormItem>

                    {uploading && (
                        <div className="space-y-2">
                            <Progress value={uploadProgress} className="w-full" />
                            <p className="text-sm text-center text-muted-foreground">{Math.round(uploadProgress)}%</p>
                        </div>
                    )}

                    {uploadedUrl && !uploading && (
                        <div className="space-y-2">
                            <FormLabel>Uploaded Image URL</FormLabel>
                            <div className="flex items-center gap-2">
                                <Input readOnly value={uploadedUrl} className="bg-gray-100" />
                                <Button type="button" variant="outline" size="icon" onClick={copyUrlToClipboard}>
                                    <Copy className="h-4 w-4" />
                                    <span className="sr-only">Copy URL</span>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
              </div>

               <Separator />
              
               <div>
                <h3 className="text-lg font-semibold mb-4">Media</h3>
                 <p className="text-xs text-muted-foreground mb-4">Use external URLs for images. The first image is the main one.</p>
                <div className="space-y-2">
                    <FormField control={form.control} name="imageUrl1" render={({ field }) => ( <FormItem><FormControl><Input {...field} placeholder="Main Image URL" /></FormControl><FormMessage /></FormItem> )}/>
                    <FormField control={form.control} name="imageUrl2" render={({ field }) => ( <FormItem><FormControl><Input {...field} placeholder="Gallery Image 2 URL" /></FormControl><FormMessage /></FormItem> )}/>
                    <FormField control={form.control} name="imageUrl3" render={({ field }) => ( <FormItem><FormControl><Input {...field} placeholder="Gallery Image 3 URL" /></FormControl><FormMessage /></FormItem> )}/>
                    <FormField control={form.control} name="imageUrl4" render={({ field }) => ( <FormItem><FormControl><Input {...field} placeholder="Gallery Image 4 URL" /></FormControl><FormMessage /></FormItem> )}/>
                </div>
              </div>

              <Separator />

              <div>
                 <h3 className="text-lg font-semibold mb-4">Details</h3>
                 <div className='space-y-4'>
                    <FormField control={form.control} name="description" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl><Textarea {...field} rows={5} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}/>
                    <FormField control={form.control} name="sizes" render={() => (
                      <FormItem>
                          <FormLabel>Available Sizes</FormLabel>
                          <div className="flex flex-wrap gap-x-4 gap-y-2">
                          {AVAILABLE_SIZES.map((size) => (
                              <FormField key={size} control={form.control} name="sizes" render={({ field }) => (
                                <FormItem key={size} className="flex flex-row items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(size)}
                                      onCheckedChange={(checked) => {
                                        const updatedSizes = field.value || [];
                                        return checked
                                          ? field.onChange([...updatedSizes, size])
                                          : field.onChange(updatedSizes.filter(value => value !== size));
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal text-sm">{size}</FormLabel>
                                </FormItem>
                              )}/>
                          ))}
                          </div>
                        <FormMessage />
                      </FormItem>
                    )}/>
                 </div>
              </div>

               <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Color Palette</h3>
                 <FormField control={form.control} name="availableColors" render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid grid-cols-6 sm:grid-cols-8 gap-3">
                        {PRESET_COLORS.map((color) => {
                          const isSelected = field.value?.some(c => c.hex === color.hex);
                          return (
                            <button
                              type="button"
                              key={color.hex}
                              onClick={() => {
                                const currentColors = field.value || [];
                                const newColors = isSelected
                                  ? currentColors.filter(c => c.hex !== color.hex)
                                  : [...currentColors, color];
                                field.onChange(newColors);
                              }}
                              className={`w-9 h-9 rounded-full border-2 transition-all ${isSelected ? 'ring-2 ring-offset-2 ring-primary' : 'border-gray-300'}`}
                              style={{ backgroundColor: color.hex }}
                              title={color.name}
                            >
                              <span className="sr-only">{color.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
              </div>

              <Button type="submit" size="lg" className="w-full">
                {editingProduct ? 'Save Changes' : 'Finish & Add Product'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && Array.from({ length: 6 }).map((_, i) => <Card key={i}><CardHeader><CardTitle><div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" /></CardTitle></CardHeader><CardContent><div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse" /><div className="h-4 bg-gray-200 rounded w-full animate-pulse" /></CardContent></Card>)}
        {products?.map(product => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span className="truncate pr-2">{product.name}</span>
                 <div className="flex gap-2 flex-shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                        <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">${product.price}</p>
              <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
              <p className="text-sm mt-2 line-clamp-3">{product.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

    