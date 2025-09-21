export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    // Fake login: ignore email/password, return un mock user
    mutationFn: async () => {
      return {
        user: {
          id: "dev123",
          email: "dev@test.com",
          name: "Dev User",
        },
      };
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
