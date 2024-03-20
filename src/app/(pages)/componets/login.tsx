"use client";
import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

const Login = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="w-[300px]  m-auto">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-[#1677ff]  ">
              登录
            </Button>
            <Button
              onClick={() => {}}
              type="primary"
              className="bg-[#1677ff]  "
            >
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
