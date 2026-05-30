import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@components/Card';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useUserStore } from '@stores/userStore';

/**
 * Login Page - 登录页面
 */
export default function Login() {
  const navigate = useNavigate();
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendCode = () => {
    setCodeSent(true);
  };

  const handleLogin = async () => {
    setLoading(true);
    // Mock login
    setUserInfo({
      id: '1',
      nickname: '屿音用户',
      phone,
    });
    navigate('/');
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-sm px-4">
        <div className="text-center mb-8">
          <h1 
            className="text-3xl text-ink-black"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            欢迎回来
          </h1>
          <p className="text-warm-gray mt-2">登录屿音电商</p>
        </div>

        <Card className="space-y-6">
          <Input
            label="手机号"
            type="tel"
            placeholder="请输入手机号"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          
          <div>
            <Input
              label="验证码"
              type="text"
              placeholder="请输入验证码"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              onClick={handleSendCode}
              disabled={!phone || codeSent}
              className="mt-2 text-sm text-gold-sand hover:text-paper-brown transition-colors disabled:text-warm-gray"
            >
              {codeSent ? '已发送' : '发送验证码'}
            </button>
          </div>

          <Button
            variant="accent"
            size="lg"
            fullWidth
            loading={loading}
            onClick={handleLogin}
            disabled={!phone || !code}
          >
            登录
          </Button>
        </Card>

        <p className="text-center text-warm-gray text-sm mt-6">
          登录即表示同意
          <a href="#" className="text-gold-sand">《用户协议》</a>
          和
          <a href="#" className="text-gold-sand">《隐私政策》</a>
        </p>
      </div>
    </div>
  );
}
