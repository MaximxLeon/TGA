import { useLogin } from '../model/useLogin';

type LoginFormProps = {
  onLogin: () => void;
};

export function LoginForm({ onLogin }: LoginFormProps) {
  const {
    idInstance,
    apiTokenInstance,
    error,
    isLoading,
    setIdInstance,
    setApiTokenInstance,
    handleSubmit,
  } = useLogin({ onLogin });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-5 rounded-2xl bg-surface p-8 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-text-primary">Вход</h1>

        <p className="text-sm text-text-secondary">Введите данные GREEN-API</p>
      </div>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-text-primary">
            ID Instance
          </span>

          <input
            type="text"
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
            placeholder="Введите idInstance"
            className="rounded-xl border border-border px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-light"
            required
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-text-primary">
            API Token Instance
          </span>

          <input
            type="password"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
            placeholder="Введите apiTokenInstance"
            className="rounded-xl border border-border px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-light"
            required
          />
        </label>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-xl bg-primary px-4 py-3 font-medium text-white transition hover:bg-primary-hover"
      >
        {isLoading ? "Проверка..." : "Войти"}
      </button>
    </form>
  );
}
