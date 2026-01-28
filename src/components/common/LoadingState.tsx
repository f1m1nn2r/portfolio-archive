interface LoadingStateProps {
  message?: string;
}

export function LoadingState({
  message = "데이터를 불러오는 중...",
}: LoadingStateProps) {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-ddd border-t-primary rounded-full animate-spin" />
        <p className="text-gray-555">{message}</p>
      </div>
    </div>
  );
}
