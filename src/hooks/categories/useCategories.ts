"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSummaryData } from "@/hooks/common/useSummaryData";
import { Category } from "@/types/admin";
import {
  getCategoriesApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "@/services/category/client";
import { useAdminMode } from "../common/useAdminMode";
import { showToast } from "@/utils/toast";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalCount: 0,
    parentCount: 0,
    childCount: 0,
  });

  // UI 상태 관리
  const [newParentName, setNewParentName] = useState("");
  const [addingParentId, setAddingParentId] = useState<string | null>(null);
  const [newSubName, setNewSubName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { isMaster } = useAdminMode();

  // 조회 (GET)
  const fetchCategories = useCallback(async () => {
    try {
      const result = await getCategoriesApi();
      if (result.success) {
        setSummary(result.summary);

        const flatData: Category[] = result.data;
        const treeData = flatData
          .filter((cat) => cat.depth === 0)
          .map((parent) => ({
            ...parent,
            children: flatData.filter((child) => child.parent_id === parent.id),
          }));
        setCategories(treeData);
      }
    } catch (err) {
      console.error("로딩 실패:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // 1차 카테고리 추가
  const handleAddParent = async () => {
    if (!isMaster) {
      showToast.error("관리자 권한이 없습니다.");
      return;
    }

    if (!newParentName.trim()) return;
    const data = await createCategoryApi({
      name: newParentName,
      depth: 0,
      parent_id: null,
      sort_order: categories.length + 1,
    });
    if (data) {
      setNewParentName("");
      fetchCategories();
    }
  };

  // 2차 카테고리 추가
  const handleAddSub = async (parentId: string) => {
    if (!isMaster) {
      showToast.error("관리자 권한이 없습니다.");
      return;
    }

    if (!newSubName.trim()) return;
    const data = await createCategoryApi({
      name: newSubName,
      depth: 1,
      parent_id: parentId,
      sort_order: 1,
    });
    if (data) {
      setNewSubName("");
      setAddingParentId(null);
      fetchCategories();
    }
  };

  // 수정 (PATCH)
  const handleUpdate = async (id: string) => {
    if (!isMaster) {
      showToast.error("관리자 권한이 없습니다.");
      return;
    }

    if (!editName.trim()) return;
    const success = await updateCategoryApi(id, editName);
    if (success) {
      setEditingId(null);
      fetchCategories();
    }
  };

  // 삭제 (DELETE)
  const handleDelete = async () => {
    if (!isMaster) {
      showToast.error("관리자 권한이 없습니다.");
      return;
    }

    if (!deleteId) return;
    const success = await deleteCategoryApi(deleteId);
    if (success) {
      setIsDeleteModalOpen(false);
      setDeleteId(null);
      fetchCategories();
    }
  };

  // 요약 데이터 계산
  const summaryItems = useSummaryData([
    {
      label: "1차 카테고리 개수",
      icon: "category",
      bgColor: "bg-bg-purple",
      getValue: () => `${summary.parentCount}개`,
    },
    {
      label: "2차 카테고리 개수",
      icon: "categoryAlt",
      bgColor: "bg-bg-blue",
      getValue: () => `${summary.childCount}개`,
    },
  ]);

  return {
    categories,
    loading,
    summary,
    summaryItems,
    isMaster,
    // 입력값 상태
    state: {
      newParentName,
      newSubName,
      editName,
      addingParentId,
      editingId,
      isDeleteModalOpen,
    },
    // 상태 변경 함수들
    setters: {
      setNewParentName,
      setNewSubName,
      setEditName,
      setAddingParentId,
      setEditingId,
      setIsDeleteModalOpen,
    },
    // 실제 API 연동 핸들러
    handlers: {
      handleAddParent,
      handleAddSub,
      handleUpdate,
      handleDelete,
      openEdit: (cat: Category) => {
        setEditingId(cat.id);
        setEditName(cat.name);
      },
      openDelete: (id: string) => {
        setDeleteId(id);
        setIsDeleteModalOpen(true);
      },
    },
  };
};
