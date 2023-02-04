const { register } = require('../../controllers/authController')
const User = require('../../models/authModel')
const hashPassword = require('../../utils/helpers').hashPassword

jest.mock('../../utils/helpers', () => ({
    hashPassword: jest.fn(() => 'hash password') 
}))

jest.mock('../../models/authModel.js')


const req = {
    body: {
        firstNmae: 'fake_fname',
        secondName: 'fake_sname',
        email: 'fake_email',
        password: 'fake_password',
    },
}

const res = {
    status: jest.fn((x) => x),
    send: jest.fn((x) => x),
    json: jest.fn(),
}

it('should send a status code of 400 when required fields are missing', async () => {
    const req = {
        body: {
            firstNmae: '',
            secondName: '',
            email: '',
            password: '',
        },
    }

    try {
        await register(req, res);
    } catch (error) {
        expect(error.message).toBe('Please add all fields');
    }
    expect(res.status).toHaveBeenCalledWith(400);
})

it('should send a status code of 400 when user exists', async () => {
    User.findOne.mockImplementationOnce(() => ({
        id: 1,
        firstNmae: 'fake_fname',
        secondName: 'fake_sname',
        email: 'fake_email',
        password: 'fake_password',
    }))
    try {
        await register(req, res);
    } catch (error) {
        expect(error.message).toBe('User already exists');
    }
    expect(res.status).toHaveBeenCalledWith(400);
})

it('should send a status code of 201 when user is created', async () => {
    User.findOne.mockImplementationOnce(() => undefined)
    User.create.mockResolvedValueOnce({
        id: 1,
        firstNmae: 'fake_fname',
        secondName: 'fake_sname',
        email: 'fake_email',
        password: 'fake_password',
    })
    await register(req, res)
    expect(hashPassword).toHaveBeenCalledWith('fake_password')
    expect(User.create).toHaveBeenCalledWith({
        firstNmae: 'fake_fname',
        secondName: 'fake_sname',
        email: 'fake_email',
        password: 'hash password'
    })
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
        first_name: 'fake_fname',
        last_name: 'fake_sname',
    })
})

it('should send a status code of 400 when user is not created', async () => {
    User.findOne.mockImplementationOnce(() => undefined)
    User.create.mockResolvedValueOnce({
        firstNmae: '',
        secondName: '',
        email: '',
        password: '',
    })

    try {
        await register(req, res)
    } catch (error) {
        expect(error.message).toBe('Invalid User Data');
    }
    expect(res.status).toHaveBeenCalledWith(400)
})