"use client";
import { Button, Input } from "antd";

const Item = ({ data, dele }: any) => {
  return (
    <div className="m-auto w-[1100px] max-h-[420px] justify-between   flex   mb-5">
      <div>
        <div className="w-[400px] h-[300px] bg-white flex justify-center items-center">
          {data.previewImage ? (
            <img
              alt="example"
              style={{ width: "100%", height: "100%" }}
              src={data.previewImage}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex flex-col ">
        <Input
          className="w-[400px] h-[100px] rounded-none  border-1 !bg-white !text-black"
          value={data.value}
          disabled
        />
        <Input
          className="w-[400px] h-[100px] rounded-none  !bg-white !text-black"
          value={data.words}
          disabled
        />
      </div>
      <div className="pt-[100px]">
        <Button
          onClick={() => {
            dele(data.id);
          }}
          type="primary"
          className="bg-[#1677ff] w-[100px]  "
        >
          删除
        </Button>
      </div>
    </div>
  );
};
export default Item;
