import type { FC } from 'react';
import { useState } from 'react';
import { Container } from '../components/layout/Container';
import { PageTitle } from '../components/ui/PageTitle';
import { TextEditor } from '../features/articles/components/editor/TextEditor';
import { CustomInput } from '../components/ui/CustomInput';
import { MdTitle, MdDescription } from 'react-icons/md';
import { Button } from '../components/ui/Button';
import { Controller, useForm } from 'react-hook-form';
import { CustomTextarea } from '../components/ui/CustomTextarea';
import { CustomSelect } from '../components/ui/CustomSelect';
import { FaTags } from 'react-icons/fa';
import { CustomImageUpload } from '../components/ui/CustomImageUpload';
import {
  editorSchema,
  type EditorFormData,
} from '../features/articles/validation/editorSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CATEGORIES } from '../constants/categories';

export const Editor: FC = () => {
  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors },
  } = useForm<EditorFormData>({
    resolver: zodResolver(editorSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
      categories: [],
      images: [],
    },
  });

  const [isOverLimit, setIsOverLimit] = useState(false);

  const onSubmit = (data: EditorFormData) => {
    console.log('Form data:', data);
  };

  const values = watch();

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
            error={errors.title}
          />

          <CustomTextarea
            label="Description"
            placeholder="Enter the description"
            register={register('description')}
            name="description"
            currentValue={values.description}
            icon={<MdDescription />}
            showCounter
            maxLength={350}
            rows={3}
            error={errors.description}
          />

          <Controller
            name="categories"
            control={control}
            render={({ field }) => (
              <CustomSelect
                name="categories"
                label="Select Categories"
                options={CATEGORIES}
                selected={field.value}
                onChange={field.onChange}
                minSelection={2}
                maxSelection={5}
                icon={<FaTags />}
                error={errors.categories?.message}
              />
            )}
          />

          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <CustomImageUpload
                label="Upload images"
                onChange={field.onChange}
                maxFiles={5}
                error={errors.images?.message}
              />
            )}
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
                error={errors.content?.message}
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
