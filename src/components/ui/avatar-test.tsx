import type { Meta, StoryObj } from "@storybook/react";

// 1. 컴포넌트 파일을 불러오는 대신, 여기서 즉석에서 임시 컴포넌트를 만듭니다.
const TestComponent = ({ text, color }: { text: string; color: string }) => (
  <div
    style={{
      padding: "20px",
      backgroundColor: color,
      borderRadius: "8px",
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    }}
  >
    {text}
  </div>
);

const meta: Meta<typeof TestComponent> = {
  title: "Debug/TestComponent",
  component: TestComponent,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof TestComponent>;

// 2. 스토리북에서 확인할 데이터 설정
export const RedBox: Story = {
  args: {
    text: "스토리북 연결 성공! (빨강)",
    color: "red",
  },
};

export const BlueBox: Story = {
  args: {
    text: "Vercel 배포 성공! (파랑)",
    color: "blue",
  },
};
