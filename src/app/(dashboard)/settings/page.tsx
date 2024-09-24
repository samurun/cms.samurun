import SettingTheme from '@/components/setting-theme';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seetings',
  description: 'Manage your stacks and view their sales performance.',
};

export default function Settings() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Mode</CardTitle>
          <CardDescription>Toggle between light and dark mode.</CardDescription>
        </CardHeader>
        <CardContent>
          <SettingTheme />
        </CardContent>
      </Card>
      <Card x-chunk='dashboard-04-chunk-1'>
        <CardHeader>
          <CardTitle>Store Name</CardTitle>
          <CardDescription>
            Used to identify your store in the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input placeholder='Store Name' />
          </form>
        </CardContent>
        <CardFooter className='border-t px-6 py-4'>
          <Button>Save</Button>
        </CardFooter>
      </Card>
      <Card x-chunk='dashboard-04-chunk-2'>
        <CardHeader>
          <CardTitle>Plugins Directory</CardTitle>
          <CardDescription>
            The directory within your project, in which your plugins are
            located.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className='flex flex-col gap-4'>
            <Input placeholder='Project Name' defaultValue='/content/plugins' />
            <div className='flex items-center space-x-2'>
              <Checkbox id='include' defaultChecked />
              <label
                htmlFor='include'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Allow administrators to change the directory.
              </label>
            </div>
          </form>
        </CardContent>
        <CardFooter className='border-t px-6 py-4'>
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </>
  );
}
