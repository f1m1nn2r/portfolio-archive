import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { useAdmin } from "@/providers/AdminProvider";
import { ComponentProps } from "react";

interface DeleteButtonProps extends Partial<ComponentProps<typeof Button>> {
  onClick: () => void;
}

export function DeleteButton({ onClick, ...props }: DeleteButtonProps) {
  const { isMaster } = useAdmin();

  if (!isMaster) return null;

  return (
    <Button
      variant="secondary"
      size="md"
      {...props}
      onClick={onClick}
      disabled={props.disabled}
    >
      <Icon type="trash" />
      선택 항목 삭제
    </Button>
  );
}
