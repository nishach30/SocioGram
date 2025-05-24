import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField,FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import FileUploader from "../shared/FileUploader";
import { Input } from "../ui/input";
import type { Models } from "appwrite";
import { PostValidation } from '../../../src/lib/validation'
import { useUserContext } from "../../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCreatePost, useUpdatePost } from "../../lib/react-query/queriesAndMutation";
import Loader from "../shared/Loader";

type PostFormProps = {
    post?: Models.Document,
    action: 'Create' | 'Update'
}

const PostForm = ({post, action}: PostFormProps) => {
    // 1. Define your form.
    const {mutateAsync : createPost, isPending:isLoadingCreate} = useCreatePost();
    const {mutateAsync : updatePost, isPending:isLoadingUpdate} = useUpdatePost();

    const {user} = useUserContext();
    const navigate= useNavigate();
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post? post?.caption : '',
            file: [],
            location: post? post?.location : '',
            tags: post? post?.tags.join(',') : ''      
        },
    })   
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof PostValidation>) {
        if(post && action === 'Update'){
            const updatedPost = await updatePost({
                ...values,
                postId: post.$id,
                imageId: post?.imageId,
                imageUrl: post?.imageUrl
            })

            if(!updatedPost){
                toast("Please try again")
            }

            return navigate(`/post/${post.$id}`);
        }

        const newPost= await createPost({
            ...values,
            userId: user.id,
        })
        if(!newPost){
            toast('Please try again');
        }
        navigate('/');
    }
    
  return (
	<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
            <FormField
                control={form.control}
                name="caption"
                render={({ field }: any) => (
                    <FormItem>
                        <FormLabel className="shad-form_label">Caption</FormLabel>
                        <FormControl>
                            <Textarea className="shad-textarea custom-scrollbar" {...field}/>
                        </FormControl>
                        <FormMessage className="shad-form_message"/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="file"
                render={({ field }: any) => (
                    <FormItem>
                        <FormLabel className="shad-form_label">Add Photos</FormLabel>
                        <FormControl>
                            <FileUploader 
                                fieldChange= {field.onChange}
                                mediaUrl= {post?.imageUrl}
                            />
                        </FormControl>
                        <FormMessage className="shad-form_message"/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="location"
                render={({ field }: any) => (
                    <FormItem>
                        <FormLabel className="shad-form_label">Add Location</FormLabel>
                        <FormControl>
                            <Input type="text" className="shad-input" {...field}/>
                        </FormControl>
                        <FormMessage className="shad-form_message"/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="tags"
                render={({ field }: any) => (
                    <FormItem>
                        <FormLabel className="shad-form_label">Add Tags(Separated by comma " , ")</FormLabel>
                        <FormControl>
                            <Input type="text" className="shad-input" placeholder="Art, Expression, Learn" {...field}/>
                        </FormControl>
                        <FormMessage className="shad-form_message"/>
                    </FormItem>
                )}
            />

            <div className="flex gap-4 items-center justify-end">
                <Button type="button" className="shad-button_dark_4">
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoadingCreate || isLoadingUpdate} className="shad-button_primary whitespace-nowrap">
                    {isLoadingCreate || isLoadingUpdate && <Loader/>}
                    {action} Post
                </Button>
            </div>
        </form>
    </Form>
  )
}

export default PostForm