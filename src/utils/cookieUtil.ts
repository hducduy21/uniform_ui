export const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
  };
  
export const getAccessToken = (): string | null => {
    return getCookie("accessToken");
};