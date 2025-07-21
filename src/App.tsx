import AvatarPreview from "./components/AvatarPreview";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <AvatarPreview />
      </div>
    </div>
  );
};

export default App;
