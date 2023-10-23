import { Button, Checkbox, Form, Input } from 'antd';
import { FC } from 'react';
import illustrationUrl from '@/assets/images/illustration.png';
import './login.css';
import { useSetThemeStore } from '@/store/theme'
const LoginPage: FC = () => {
  //const { refetch: getVcode, data: vCodeImage } = VerifyCodeInfo;
  const titleFontLength = 4
  const { setThemeColor } = useSetThemeStore(s => s)
  const RememberMeCheckbox = (props: any) => (
    <div className="flex items-center mr-auto">
      <Checkbox
        {...props}
        id="remember-me"
        className="form-check-input border mr-2"
        checked={true}
      />
      <label className="cursor-pointer select-none text-primary" htmlFor="remember-me">
        自动登录
      </label>
    </div>
  );
  
  return (
    <div className="login">
      <div className="container sm:px-10">
        <div className="grid grid-cols-2 gap-4">
          {/* BEGIN: Login Info */}
          <div className="flex flex-col min-h-screen">
            <div className="my-auto relative z-10">
              <img className="-intro-x w-1/2 -mt-16" src={illustrationUrl} />
              <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                {/* 互助修车，无畏擦刮。开放平台，赋能保障服务。 */}
              </div>
            </div>
          </div>
          {/* END: Login Info */}

          {/* BEGIN: Login Form */}
          <div className="h-screen flex flex-col justify-center py-0 my-0">
            <div className="mx-auto">
              <div className="-intro-x text-primary font-medium text-2xl leading-tight">
                <div className="pb-4 text-3xl font-bold">欢迎使用</div>
                <div className="pb-2">系统</div>
                <div className="mb-8 h-1 bg-primary" style={{ width: `${titleFontLength * 20}px` }} />
              </div>
              <div className="intro-y  dark:bg-darkmode-600 bg-transparent rounded-lg shadow-2xl w-auto z-50">
                <h2 className="intro-x font-bold text-xl text-gray-600 text-left mx-10 pt-8">账号登录</h2>
                <div className="intro-x mt-7 mx-10">
                  <Form>
                    <Form.Item
                      name="account"
                      rules={[{ required: true, message: '请输入用户名' }]}
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        type="text"
                        className="intro-x login__input rounded-xl py-3 px-4 block"
                        placeholder="请输入用户名"
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: '请输入登录密码' }]}
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        type="password"
                        className="intro-x login__input rounded-xl py-3 px-4 block mt-5"
                        placeholder="请输入登录密码"
                      />
                    </Form.Item>
                    <Form.Item
                      name="vcode"
                      rules={[{ required: true, message: '请输入验证码' }]}
                      style={{ marginBottom: 0 }}
                    >
                      <div className="flex align-center mt-5">
                        <Input className="intro-x rounded-xl py-3 px-4 block" placeholder="请输入验证码" />
                        <div className="flex items-center text-center cursor-pointer ml-2">
                          <img
                            alt="验证码"
                            title="点击更换验证码"
                            className="w-[100px] h-[45px] rounded-xl"
                          />
                        </div>
                      </div>
                    </Form.Item>
                    <div className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                      <Form.Item
                        name="rememberMe"
                        style={{ marginBottom: 0 }}
                        valuePropName="checked"
                      >
                        <RememberMeCheckbox />
                      </Form.Item>
                    </div>
                    <Form.Item>
                      <div className="intro-x mt-5 text-left mb-10">
                        <Button
                          onClick={() => {
                            const letters = '0123456789ABCDEF';
                            let color = '#';
                            for (let i = 0; i < 6; i++) {
                              color += letters[Math.floor(Math.random() * 16)];
                            }
                            setThemeColor(color)
                            //const body = document.querySelector('body');
                            // const dynamicColor = color; // 生成随机颜色
                            // body.style.setProperty('--dynamic-color', dynamicColor); // 设置 CSS 变量的值
                          }}  
                          type="primary"
                          htmlType="submit"
                          className="py-6 px-4 w-full mr-3 align-top transition bg-primary border-primary text-white dark:border-primary duration-200 border shadow-sm inline-flex items-center justify-center rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:transition-none"
                        >
                          登录
                        </Button>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
          {/* END: Login Form */}
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
