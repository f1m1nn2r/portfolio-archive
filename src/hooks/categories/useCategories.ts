"use client";

import { useState, useMemo } from "react";
import { useAppSWR } from "@/hooks/common/useAppSWR";
import { getCategoriesApi } from "@/services/category/client";
import { Category } from "@/types/admin";
import { useAdminMode } from "@/hooks/common/useAdminMode";
import { useSummaryData } from "@/hooks/common/useSummaryData";
import { CategoryResponse } from "@/types/api/category";

export const useCategories = ({
  initialData,
}: { initialData?: CategoryResponse } = {}) => {
  const { isMaster } = useAdminMode();

  const {
    data,
    isLoading: loading,
    createItem,
    updateItem,
    deleteItem,
  } = useAppSWR<CategoryResponse, Partial<Category>, { name: string }>(
    "/api/categories",
    getCategoriesApi,
    {
      fallbackData: initialData,
    },
  );

  const categories = useMemo(() => {
    if (!data?.data) return [];
    const flatData = data.data;
    return flatData
      .filter((cat) => cat.depth === 0)
      .map((parent) => ({
        ...parent,
        children: flatData.filter((child) => child.parent_id === parent.id),
      }));
  }, [data]);

  const [newParentName, setNewParentName] = useState("");
  const [newSubName, setNewSubName] = useState("");
  const [addingParentId, setAddingParentId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleAddParent = async () => {
    if (!newParentName.trim()) return;
    const success = await createItem({
      name: newParentName,
      depth: 0,
      parent_id: null,
      sort_order: categories.length + 1,
    });
    if (success) setNewParentName("");
  };

  const handleAddSub = async (parentId: string) => {
    if (!newSubName.trim()) return;
    const success = await createItem({
      name: newSubName,
      depth: 1,
      parent_id: parentId,
      sort_order: 1,
    });
    if (success) {
      setNewSubName("");
      setAddingParentId(null);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return;
    const success = await updateItem(id, { name: editName });
    if (success) setEditingId(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const success = await deleteItem(deleteId);
    if (success) {
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  // 요약 데이터 가공
  const summaryItems = useSummaryData([
    {
      label: "1차 카테고리 개수",
      icon: "category",
      bgColor: "bg-bg-purple",
      getValue: () => `${data?.summary?.parentCount || 0}개`,
    },
    {
      label: "2차 카테고리 개수",
      icon: "categoryAlt",
      bgColor: "bg-bg-blue",
      getValue: () => `${data?.summary?.childCount || 0}개`,
    },
  ]);

  return {
    categories,
    loading,
    summary: data?.summary || { totalCount: 0, parentCount: 0, childCount: 0 },
    summaryItems,
    isMaster,
    state: {
      newParentName,
      newSubName,
      editName,
      addingParentId,
      editingId,
      isDeleteModalOpen,
    },
    setters: {
      setNewParentName,
      setNewSubName,
      setEditName,
      setAddingParentId,
      setEditingId,
      setIsDeleteModalOpen,
    },
    handlers: {
      handleAddParent,
      handleAddSub,
      handleUpdate,
      handleDelete,
      openEdit: (cat: Category) => {
        if (!isMaster) return;
        setEditingId(cat.id);
        setEditName(cat.name);
      },
      openDelete: (id: string) => {
        if (!isMaster) return;
        setDeleteId(id);
        setIsDeleteModalOpen(true);
      },
    },
  };
};
