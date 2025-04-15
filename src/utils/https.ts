import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, AxiosHeaders } from 'axios';

// 定义业务错误类型
class BusinessError extends Error {
    code: number;
    data?: any;

    constructor(message: string, code: number, data?: any) {
        super(message);
        this.name = 'BusinessError';
        this.code = code;
        this.data = data;
    }
}

// 定义HTTP错误类型
class HttpError extends Error {
    status: number;
    config: AxiosRequestConfig;

    constructor(message: string, status: number, config: AxiosRequestConfig) {
        super(message);
        this.name = 'HttpError';
        this.status = status;
        this.config = config;
    }
}

// 基础响应格式（根据后端实际情况调整）
interface BaseResponse<T = any> {
    code: number;
    data: T;
    message?: string;
}

type RequestConfig = AxiosRequestConfig & {
    skipErrorHandler?: boolean; // 是否跳过默认错误处理
};

class HttpClient {
    private instance: AxiosInstance;

    constructor(config?: AxiosRequestConfig) {
        this.instance = axios.create({
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            },
            ...config
        });

        this.setupInterceptors();
    }

    // 设置拦截器
    private setupInterceptors() {
        // 请求拦截器
        this.instance.interceptors.request.use(
            config => {
                // 这里可以添加全局请求处理，例如添加token
                // const token = localStorage.getItem('token');
                // if (token) {
                //   config.headers.Authorization = `Bearer ${token}`;
                // }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );

        // 响应拦截器
        this.instance.interceptors.response.use(
            (response: AxiosResponse<BaseResponse>) => {
                // 处理HTTP成功状态码但业务错误的情况
                if (response.data.code !== 0) {
                    const error = new BusinessError(response.data.message || 'Business Error', response.data.code, response.data);
                    return Promise.reject(error);
                }

                // 直接返回业务数据
                return response.data.data;
            },
            (error: AxiosError) => {
                // 处理HTTP错误状态码
                if (error.response) {
                    const httpError = new HttpError(error.message, error.response.status, error.config || {});
                    return Promise.reject(httpError);
                }

                // 处理网络错误或超时
                if (error.request) {
                    const networkError = new Error(error.message || 'Network Error');
                    return Promise.reject(networkError);
                }

                return Promise.reject(error);
            }
        );
    }

    // 封装请求方法
    public async request<T = any>(config: RequestConfig): Promise<T> {
        try {
            return await this.instance.request<BaseResponse<T>, T>(config);
        } catch (error) {
            if (config.skipErrorHandler) {
                throw error;
            }

            // 统一错误处理（可以根据需要扩展）
            if (error instanceof BusinessError) {
                console.error('业务错误:', error.message, error.code);
            } else if (error instanceof HttpError) {
                console.error('HTTP错误:', error.status, error.message);
            } else {
                console.error('未知错误:', error);
            }

            throw error;
        }
    }

    public get<T = any>(url: string, config?: RequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'GET', url });
    }

    public post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'POST', url, data });
    }

    public put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'PUT', url, data });
    }

    public delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'DELETE', url });
    }
}

const config: AxiosRequestConfig = {
    baseURL: '/',
    timeout: 60 * 1000,
    headers: {
        post: AxiosHeaders.from({
            'Content-Type': 'application/json'
        })
    }
};
export default new HttpClient(config);
