import { User } from "@/lib/services/auth.service";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "../ui/dialog";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUpdateUser } from "@/lib/hooks/mutations/useAuth";
import { RiLoader2Line } from "react-icons/ri";

interface EditProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: User | null;
  initials: string;
}

const formSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Enter a valid phone number"),
  email: z.email("Enter a valid email address").min(1, "Email is required"),
  name: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Full name can only contain letters, spaces, hyphens, and apostrophes"
    ),
});

type EditProfile = z.infer<typeof formSchema>;

const EditProfile = ({
  open,
  onOpenChange,
  session,
  initials,
}: EditProfileProps) => {
  const { mutate, isPending } = useUpdateUser();
  const { control, handleSubmit } = useForm<EditProfile>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: session?.email,
      name: session?.fullName,
      phoneNumber: session?.phoneNumber,
    },
  });

  const onSubmit = (data: EditProfile) => {
    if (!session) return;

    mutate({ id: session.id, payload: data });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dialog">
        <DialogHeader className="mt-[74px] items-center gap-6">
          <DialogTitle className="dialog-title text-center">
            Edit Profile
          </DialogTitle>
          <Avatar className="size-23.75 border-2 border-gray-200">
            <AvatarImage src={session?.avatarUrl} alt={session?.fullName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-7">
          <FieldSet>
            <FieldGroup className="gap-6">
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="field">
                    <FieldLabel className="form-label">Full Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className="form-input"
                      placeholder="Home"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="field">
                    <FieldLabel className="form-label">Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className="form-input"
                      placeholder="example@gmail.com"
                    />
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="phoneNumber"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="field">
                    <FieldLabel className="form-label">Phone Number</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className="form-input"
                      placeholder="+234 080000000000"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
          <div className="px-[7.5px]">
            <Button
              type="submit"
              className="mt-6 submit-btn mb-4.5"
              disabled={isPending}
            >
              {isPending ? (
                <RiLoader2Line className="size-5 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
