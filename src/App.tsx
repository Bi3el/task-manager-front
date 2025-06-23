import { Haeader } from "./components/header";
import { PageContainer } from "./components/page-container";
import { PageContent } from "./components/page-content";
import { useTasksContext } from "./contexts/tasks-context";

export function App() {
  const { data } = useTasksContext();
  
  if (!data) {
    return;
  }

  console.log(data);

  return (
    <PageContainer>
      <PageContent>
        <Haeader />
      </PageContent>
    </PageContainer>
  )
}
