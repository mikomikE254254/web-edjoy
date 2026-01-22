"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { Product } from '@/lib/types';
import { suggestStyles, SuggestStylesOutput } from '@/ai/flows/ai-style-suggestion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Wand2, AlertTriangle, Loader2 } from 'lucide-react';

interface AIStyleGuideProps {
  product: Product;
}

interface IFormInput {
  productImage: FileList;
}

export default function AIStyleGuide({ product }: AIStyleGuideProps) {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SuggestStylesOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const convertFileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    if (data.productImage.length === 0) {
      setError("Please select a product image to analyze.");
      setIsLoading(false);
      return;
    }

    try {
      const productPhotoDataUri = await convertFileToDataUri(data.productImage[0]);
      const suggestion = await suggestStyles({
        productPhotoDataUri,
        productDescription: product.description,
      });
      setResult(suggestion);
    } catch (e) {
      console.error(e);
      setError("An error occurred while generating style suggestions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pt-4">
      <p className="text-sm text-muted-foreground">
        Use our AI assistant to get style pairing and merchandising ideas. Upload a photo of the product (e.g., on a mannequin or a flat lay) to get started.
      </p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="productImage" className="block text-sm font-medium text-foreground/80 mb-1">Product Photo</label>
          <input 
            id="productImage"
            type="file" 
            accept="image/*"
            {...register("productImage", { required: true })}
            className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Generate Style Guide
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card className="bg-accent/80">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Style Suggestion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{result.styleSuggestion}</p>
          </CardContent>
          <CardFooter>
            <details className="w-full">
              <summary className="cursor-pointer text-sm font-semibold">View Reasoning</summary>
              <p className="mt-2 text-sm text-muted-foreground">{result.reasoning}</p>
            </details>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
