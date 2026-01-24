'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCollection, useFirestore } from '@/firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash, Edit } from 'lucide-react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  price: z.number().min(0, 'Price must be positive'),
  description: z.string().min(1, 'Description is required'),
  category: z.enum(['women', 'men', 'children', 'bags']),
  style: z.enum(['casual', 'streetwear', 'formal', 'vintage', 'minimal']).optional(),
  imageUrl: z.string().url('Must be a valid URL'),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AdminDashboard() {
  const firestore = useFirestore();
  const { data: products, isLoading } = useCollection<Product>(firestore ? collection(firestore, 'products') : null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      slug: '',
      price: 0,
      description: '',
      category: 'women',
      style: 'casual',
      imageUrl: ''
    },
  });

  React.useEffect(() => {
    if (editingProduct) {
      form.reset({
        name: editingProduct.name,
        slug: editingProduct.slug,
        price: editingProduct.price,
        description: editingProduct.description,
        category: editingProduct.category,
        style: editingProduct.style,
        imageUrl: editingProduct.images[0]?.url || ''
      });
    } else {
      form.reset();
    }
  }, [editingProduct, form]);

  const onSubmit = async (data: ProductFormData) => {
    if (!firestore) return;
    
    const productData = {
      name: data.name,
      slug: data.slug,
      price: data.price,
      description: data.description,
      category: data.category,
      style: data.style,
      images: [{ url: data.imageUrl, alt: data.name, hint: 'product image' }],
      // Add other fields with defaults if necessary
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    if (editingProduct) {
      const productRef = doc(firestore, 'products', editingProduct.id);
      await updateDoc(productRef, { ...productData, updatedAt: serverTimestamp() });
    } else {
      await addDoc(collection(firestore, 'products'), productData);
    }
    
    setIsDialogOpen(false);
    setEditingProduct(null);
  };
  
  const handleDelete = async (productId: string) => {
    if (!firestore) return;
    if (window.confirm('Are you sure you want to delete this product?')) {
        await deleteDoc(doc(firestore, 'products', productId));
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                     <p className="text-xs text-muted-foreground">File upload can be added later.</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save Product</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && <p>Loading products...</p>}
        {products?.map(product => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                {product.name}
                 <div className="flex gap-2">
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
