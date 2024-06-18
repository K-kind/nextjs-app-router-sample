import { Button } from "@mantine/core";

import { Logger } from "@/app/ui-sample/Logger";

export const ClientButton = () => {
  return (
    <Button>
      クライアント側のボタン <Logger />
    </Button>
  );
};
