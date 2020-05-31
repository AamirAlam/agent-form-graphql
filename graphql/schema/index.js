const { buildSchema  } = require('graphql');

module.exports =  buildSchema(`
type FormFields {
    form_id: String!
    title: String
    name: String!
    type: String!
    required: Boolean!
    placeholder: String
    value: String
}

type FormResponse {
    name: String!
    email: String!
    phone: String!
    zip: String!
    photo: String!
    document: String!
}

type Form {
    _id: String!
    title: String!
    description: String
    role: String!
    salary: Float!
    fields: [FormFields!]
}

input FormInput {
    name: String!
    email: String!
    phone: String!
    zip: String!
    photo: String!
    document: String!
}

type SubmitResponse {
    success: Boolean!
    message: String!
}

type rootQuery {
    forms: [Form!]!
}

type rootMutation {
    submitForm(formInput: FormInput): FormResponse!
}

schema {
    query: rootQuery
    mutation: rootMutation
}
`);