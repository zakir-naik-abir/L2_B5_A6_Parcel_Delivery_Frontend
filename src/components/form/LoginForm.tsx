import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Button } from '../ui/button';
import { useLoginMutation } from '@/redux/features/auth/auth.api';
import { toast } from 'sonner';

const LoginForm: React.FC = () => {
  
  const navigate = useNavigate();
  const form = useForm({
      defaultValues: {
        email: "superadmin@gmail.com",
        password: "A@12345678",
      },
    });

    const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
  
    try {
      const result = await login(data).unwrap();

      if(result.success){
        toast.success('Login successful')
        navigate('/');
      }
    } catch (err) {
      console.error(err);

      // if(err.data.message ==="Incorrect Email"){
      //   toast.error("Incorrect Email")
      // };

      if(err.data.message ==="Password is wrong"){
        toast.error("Incorrect Password")
      };
      
      if(err.data.message ==="You are not verified"){
        toast.error("Your account is not verified");
        navigate("/verify", {state: data.email });
      }
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address :</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Create Password :</FormLabel>
              <FormControl>
                <Input placeholder="Enter a strong password" {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full  bg-purple-400 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 transition-colors duration-300">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;