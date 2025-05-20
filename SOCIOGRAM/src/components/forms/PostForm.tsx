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

type PostFormProps = {
    post?: Models.Document;
}
const PostForm = ({post}: PostFormProps) => {
    // 1. Define your form.
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
        console.log("[]submit ")
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
                <Button type="submit" className="shad-button_primary whitespace-nowrap">
                    Submit
                </Button>
            </div>
        </form>
    </Form>
  )
}

export default PostForm