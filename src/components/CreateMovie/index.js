import { Input, Button, Row, Form, Label } from 'primitives'
import { useMutation } from '@apollo/client'
import { CREATE_MOVIE } from 'gql/mutations'
import { useForm } from 'react-hook-form'
import styles from './CreateMovie.module.css'
import { GET_MOVIES } from 'gql/queries'

export function CreateMovie() {
  const [createMovie, { data, loading, error }] = useMutation(CREATE_MOVIE)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {
    createMovie({ variables: { data: data }, refetchQueries: [GET_MOVIES] })
    reset()
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Label htmlFor="movieTitle">Title:</Label>
        <Input {...register('title', { required: true })} id="movieTitle" />
      </Row>
      <Button type="submit">Create</Button>
    </Form>
  )
}
