        import { ChangeEvent, FormEvent, useState } from 'react';
        import { useMutation, useQueryClient } from 'react-query';
        import styled from 'styled-components';
        import { createComment } from '../../pages/api';
        import CommentItem from '../Detail/CommentItem';

        const CommentList = ({
        itemData,
        userId,
        }: {
        itemData: CommentType[];
        userId: string;
        }) => {
        const queryClient = useQueryClient();
        const [name, setName] = useState('');
        const [body, setBody] = useState('');

        // 댓글 작성 mutation
        const { isLoading: createLoading, mutate: createMutate } =
            useMutation(createComment);

        // 닉네임 감지
        const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
        };
        // 내용 감지
        const onChangeBody = (event: ChangeEvent<HTMLInputElement>) => {
            setBody(event.target.value);
        };

        // 작성
        const submitComment = async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            createMutate(
            { userId, name, body },
            {
                onSuccess: () => {
                queryClient.invalidateQueries('comments');
                },
            }
        );
        setName('');
        setBody('');
    };
        

        if (createLoading) {
            return <div> 댓글을 작성중입니다.</div>;
        }

        return (
            <div>
                <Comment>댓글작성</Comment>
            <Form onSubmit={submitComment}>
                <BodyInput
                maxLength={200}
                onChange={onChangeBody}
                value={body}
                placeholder="내용 (최대 200자)"
                required
                />
                <CommentBtn>등록</CommentBtn>
            </Form>
            {itemData?.map((item: CommentType) => (
                <CommentItem key={item.id} item={item} />
            ))}
            </div>
        );
        };

        export default CommentList;

        const Form = styled.form`
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 3rem;
        `;

        const BodyInput = styled.input`
        width: 87.5rem;
        height: 5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1.25rem;
        border-radius: 0.625rem;
        background-color: #eee;
        margin-bottom: 1.25rem;
            `;

        const CommentBtn = styled.button`
        height: 1.75rem;
        border-radius: 0.313rem;
        background-color: #E65925;
        color: white;
        border: none;
        margin: 0.438rem;
        position: relative;
        bottom: 2rem;
        right: 3rem;
        top: 3rem;
        &:hover {
        transform: scale(1.2);
        }
        `;

        const Comment = styled.div`
        font-size: 2rem;
        font-color: #1B1B18;
        margin-bottom:1rem;    
        }
        `;