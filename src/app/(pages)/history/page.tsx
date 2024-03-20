"use client";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  GetProp,
  Input,
  Upload,
  UploadProps,
  message,
  Image,
  UploadFile,
  Modal,
  Button,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Item from "./item";
import { useIndexedDB } from "@/app/hooks/db";
import Link from "next/link";

const HomePage = () => {
  const { todos, db, clear, loadTodos, deleteById } = useIndexedDB();
  console.log("todosccc: ", todos);
  const [list, setList] = useState(todos);
  useEffect(() => {
    if (db) {
      loadTodos();
    }
  }, [db]);
  const dele = (id: any) => {
    deleteById(id);
    loadTodos();
  };
  useEffect(() => {
    setList(todos);
  }, [todos]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between  bg1 ">
      <div className="h-[70vh] overflow-auto m-auto  ">
        {list.map((item: any) => {
          return <Item key={item.id} data={item} dele={dele} />;
        })}
        <Link href={"/"}>
          <Button type="primary" className="bg-[#1677ff]   ">
            返回首页
          </Button>
        </Link>
      </div>
    </main>
  );
};
export default HomePage;
