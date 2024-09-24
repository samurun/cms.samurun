import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const EditorComp = dynamic(() => import('../../../../components/mdx-editor'), {
  ssr: false,
});

export default function NewBlogPost() {
  return (
    <div className='container mt-10'>
      <div className=' text-foreground'>
        <Card>
          <CardHeader>
            <CardTitle>Blog</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={null}>
              <EditorComp markdown='# Hello world' />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
