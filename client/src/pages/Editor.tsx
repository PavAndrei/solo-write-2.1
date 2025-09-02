import type { FC } from 'react';
import { useState } from 'react';
import { Container } from '../components/layout/Container';
import { PageTitle } from '../components/ui/PageTitle';
import { TextEditor } from '../features/articles/components/editor/TextEditor';
import { CustomInput } from '../components/ui/CustomInput';
import { MdTitle, MdDescription } from 'react-icons/md';
import { Button } from '../components/ui/Button';
import { Controller, useForm } from 'react-hook-form';

export const Editor: FC = () => {
  const { handleSubmit, control, register } = useForm({
    defaultValues: {
      title: '',
      description: '',
      content: '',
    },
  });

  const [isOverLimit, setIsOverLimit] = useState(false);

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
  };

  return (
    <section className="h-full py-10">
      <Container>
        <PageTitle hasSubtitle="Do not miss the opportunity to share your views with the others">
          Write an article
        </PageTitle>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <CustomInput
            label="Title"
            placeholder="Enter the title"
            register={register('title')}
            name="title"
            icon={<MdTitle />}
          />

          <CustomInput
            label="Description"
            placeholder="Enter the description"
            register={register('description')}
            name="description"
            icon={<MdDescription />}
          />

          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextEditor
                label="Text"
                value={field.value}
                onChange={field.onChange}
                onLimitChange={setIsOverLimit}
              />
            )}
          />

          <Button
            ariaLabel="Post the article"
            type="submit"
            disabled={isOverLimit}
          >
            Post
          </Button>
        </form>
      </Container>
    </section>
  );
};
