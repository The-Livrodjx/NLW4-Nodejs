import {Request, Response} from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'

class AnswerController {

    // http://localhost:3333/answers/1?u=589a6315-f407-4126-84fd-1ac066879d79

    async execute(request: Request, response: Response) {

        const {value} = request.params
        const {u} = request.query

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        })

        if(!surveyUser) {

            return response.status(400).json({
                error: "Survey User does not exists"
            })
        }

        surveyUser.value = Number(value)

        await surveysUsersRepository.save(surveyUser)

        return response.json({
            surveyUser
        })
    }
}

export {AnswerController}