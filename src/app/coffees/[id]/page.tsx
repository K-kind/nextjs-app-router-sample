import { Loader2 } from "lucide-react";

export default function RootLoading() {
  return (
    <div className="flex items-center justify-center min-h-72">
      <Loader2 size="48" className="animate-spin" />
    </div>
  );
}
