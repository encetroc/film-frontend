import { Input, Button, Row, Form, Label, Select } from 'primitives'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_TRANSFER } from 'gql/mutations'
import { useForm } from 'react-hook-form'
import { client } from 'index'
import {
  GET_MOVIES,
  GET_SHAREHOLDER_TRANSFERS,
  GET_TRANSFERS,
} from 'gql/queries'

export function CreateTransfer() {
  const { loading: movieLoading, data: movieData } = useQuery(GET_MOVIES)
  const [createTransfer, { data, loading }] = useMutation(CREATE_TRANSFER)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()
  const onSubmit = async ({ amount, description, movieId }) => {
    createTransfer({
      variables: {
        data: {
          amount: parseFloat(amount),
          description: description,
          movieId,
        },
      },
      refetchQueries: [GET_TRANSFERS],
    })
    reset()
    window.location.reload()
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Label htmlFor="amount">Amount:</Label>
        <Input
          type="number"
          {...register('amount', { required: true })}
          id="amount"
        />
      </Row>
      <Row>
        <Label htmlFor="description">Description:</Label>
        <Input
          {...register('description', { required: true })}
          id="description"
        />
      </Row>
      <Row>
        <Label htmlFor="movie">Movie:</Label>
        {movieLoading && <span>Loading movies ...</span>}
        <Select {...register('movieId', { required: true })} id="movie">
          {movieData &&
            movieData.movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
        </Select>
      </Row>
      <Button type="submit">Create</Button>
    </Form>
  )
}
