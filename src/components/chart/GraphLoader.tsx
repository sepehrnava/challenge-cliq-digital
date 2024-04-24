import Spinner from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";

export default async function GraphLoader() {
  return (
    <div className={cn("relative rounded-md bg-muted p-4")}>
      <Spinner />
    </div>
  );
}
