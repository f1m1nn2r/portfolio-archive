import { useProjectStore } from "@/store/useProjectStore";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import Link from "next/link";
import { ProjectCardProps } from "@/types/ui/project";

export function ProjectCard({ project, isAdmin }: ProjectCardProps) {
  // 스토어에서 함수 직접 가져오기
  const { deleteProject, openEditModal } = useProjectStore();

  return (
    <div className="border-t-5 border-black py-7.5 px-5 bg-bg-light h-full flex flex-col">
      <div className="pb-6 mb-6 border-b-1 border-black">
        <h3 className="text-2xl font-bold">{project.title}</h3>
        <p className="text-lg font-medium">{project.period}</p>
      </div>

      <div className="space-y-2 mb-8 flex-1 text-base whitespace-pre-line">
        {project.description}
      </div>

      <div className="mt-auto">
        {isAdmin ? (
          <div className="flex justify-end gap-2">
            <Button
              variant="danger"
              size="md"
              onClick={() => deleteProject(project.id!)}
            >
              <Icon type="trash" size={16} /> 삭제
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => openEditModal(project)}
            >
              <Icon type="editAlt" size={16} /> 편집
            </Button>
          </div>
        ) : project.project_url ? (
          <Link
            href={project.project_url}
            target="_blank"
            className="inline-block px-6 py-2 border border-black rounded-full bg-white text-base hover:bg-gray-50"
          >
            Learn more
          </Link>
        ) : (
          <button className="px-6 py-2 border border-black rounded-full bg-white text-base opacity-50 cursor-not-allowed">
            Learn more
          </button>
        )}
      </div>
    </div>
  );
}
