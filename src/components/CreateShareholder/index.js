import { Input, Button, Row, Form, Label, Select } from 'primitives'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_SHAREHOLDER } from 'gql/mutations'
import { useForm } from 'react-hook-form'
import { GET_SHAREHOLDERS, GET_MOVIES } from 'gql/queries'

export function CreateShareholder() {
  const { loading: movieLoading, data: movieData } = useQuery(GET_MOVIES)
  const [createMovie, { data, loading }] = useMutation(CREATE_SHAREHOLDER)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {
    createMovie({
      variables: { data: data },
      refetchQueries: [GET_SHAREHOLDERS],
    })
    reset()
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Label htmlFor="firstName">Fistname:</Label>
        <Input {...register('firstName', { required: true })} id="firstName" />
      </Row>
      <Row>
        <Label htmlFor="lastName">Lastname:</Label>
        <Input {...register('lastName', { required: true })} id="lastName" />
      </Row>
      <Row>
        <Label htmlFor="address">Address:</Label>
        <Input {...register('address', { required: true })} id="address" />
      </Row>
      <Row>
        <Label htmlFor="IBAN">IBAN:</Label>
        <Input {...register('IBAN', { required: true })} id="IBAN" />
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
