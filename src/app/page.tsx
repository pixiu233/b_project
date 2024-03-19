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
} from "antd";
import { useState } from "react";
import styled from "styled-components";
const ExUpload = styled(Upload)`
  .ant-upload {
    width: 400px !important;
    height: 300px !important;
    border: 1px solidd white !important;
    background-color: white !important;
  }
  .ant-upload-list-item-container {
    width: 400px !important;
    height: 300px !important;
    background-color: white !important;
    img {
      object-fit: cover !important;
    }
  }
`;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
export default function Home() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [words, setWords] = useState<any>("");
  const handleCancel = () => setPreviewOpen(false);
  const [value, setValue] = useState<any>("");
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传图片</div>
    </button>
  );

  const translateJSON: any = {
    "འདི་གོ་བ་ལོག་པ་ཞིག་རེད": "那只是一个误解",
    "དབྱིན་ཡིག་གལ་ཇེ་ཆེ་རེད །": "英语变得越来越重要",
    "ཆེས་སྤྲོ་བའི་བྱ་བ་ཅི་ཞིག་རེད །": "什么是最有趣的事情",
    "འདི་ནི་རྩྭ་ཞྭ་ཞིག་རེད །": "那是一顶草帽",
    "ཤིང་ཆ་བརྩེགས་པའི་རླངས་འཁོར་ཞིག་བུད་སོང་།": "那辆卡车装着木材已经过去了",
    "རི་འག ོ་ནས་ཉི་གཞོན་ལ་བལྟས་ན་ངོ་མ་མཛེས །": "从山上看太阳出来真美",
  };
  const doTranslateJSON = () => {
    setWords(translateJSON[value] as any);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  bg1">
      <div className="m-auto w-[1100px] justify-between   flex">
        <div className="flex flex-col justify-between ">
          <Input
            onChange={(e) => setValue(e.target.value)}
            className="w-[400px] h-[60px] mb-4 p-0"
            placeholder="请输入藏文"
          />
          <ExUpload
            maxCount={1}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </ExUpload>
          <Button
            onClick={() => doTranslateJSON()}
            type="primary"
            className="bg-[#1677ff] w-[100px] mx-autos self-center "
          >
            翻译
          </Button>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </div>
        <div>
          <div className="w-[500px] h-[300px] bg-white flex justify-center items-center">
            {words}
          </div>
        </div>
      </div>
    </main>
  );
}
