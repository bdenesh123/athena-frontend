import React, { useState } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Search } from 'lucide-react';

const InputField = ({ onChange }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = () => {
    if (search.trim()) {
      onChange(search);
      setSearch('');
    }
  };

  return (
    <div className='flex w-full justify-center'>
      <div className='flex w-full items-center justify-center gap-2'>
        <Input
          name='search'
          className='w-full max-w-[400px] text-base'
          placeholder='How can I help you?'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          onClick={handleSubmit}
          type='submit'
          variant='outline'
          className='min-h-[44px] text-base'
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default InputField;
