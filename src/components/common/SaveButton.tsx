import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { ComponentProps } from "react";
import { useAdmin } from "@/providers/AdminProvider";

interface SaveButtonProps extends Partial<ComponentProps<typeof Button>> {
  onClick: () => void;
  isLoading: boolean;
}

export function SaveButton({
  onClick,
  isLoading,
  ...props // 나머지 버튼 속성(variant, size 등)을 그대로 전달
}: SaveButtonProps) {
  const { isMaster } = useAdmin();

  if (!isMaster) return null;

  return (
    <Button
      variant="ghost"
      size="md"
      {...props} // 부모에게 받은 스타일 속성 적용
      onClick={onClick}
      disabled={isLoading || props.disabled}
    >
      <Icon
        type={isLoading ? "loader" : "save"}
        className={isLoading ? "animate-spin" : ""}
      />
      {isLoading ? "저장 중..." : props.children || "저장하기"}
    </Button>
  );
}
