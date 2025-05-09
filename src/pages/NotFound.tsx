export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-6 text-lg">Page Not Found</p>
        <a href="/" className="px-6 py-2 text-white bg-black">
            Go to Home
        </a>
        </div>
    );
}