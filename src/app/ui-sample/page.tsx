import { Pagination } from "@mantine/core";

import { ClientButton } from "@/app/ui-sample/ClientButton";

export default function UiSamplePage() {
  return (
    <div>
      <div>
        <ClientButton />
      </div>
      <div>
        <Pagination total={10} />
      </div>
      {/* <div>
        <ServerButton />
      </div> */}
    </div>
  );
}
