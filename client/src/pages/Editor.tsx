import type { FC } from 'react';
import { Container } from '../components/layout/Container';
import { PageTitle } from '../components/ui/PageTitle';
import { TextEditor } from '../features/articles/components/editor/TextEditor';
import { CustomInput } from '../components/ui/CustomInput';
import { MdTitle, MdDescription } from 'react-icons/md';
import { Button } from '../components/ui/Button';

export const Editor: FC = () => {
  return (
    <section className="h-full py-10">
      <Container>
        <PageTitle hasSubtitle="Do not miss the opportunity to share your views with the others">
          Write an article
        </PageTitle>

        <form className="flex flex-col gap-4">
          <CustomInput
            label="Title"
            placeholder="Enter the title"
            icon={<MdTitle />}
          />
          <CustomInput
            label="Description"
            placeholder="Enter the description"
            icon={<MdDescription />}
          />
          <TextEditor />
          <Button ariaLabel="Post the article" type="submit">
            Post
          </Button>
        </form>
      </Container>
    </section>
  );
};
