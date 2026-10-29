package com.siersi.backend.service.sign

import com.fasterxml.jackson.databind.ObjectMapper
import com.mybatisflex.core.query.QueryWrapper
import com.mybatisflex.spring.service.impl.ServiceImpl
import com.siersi.backend.entity.Sign
import com.siersi.backend.entity.table.SignTableDef.SIGN
import com.siersi.backend.exception.BusinessException
import com.siersi.backend.mapper.SignMapper
import com.siersi.backend.request.sign.SignRequest
import org.springframework.stereotype.Service

@Service
class SignServiceImpl(
    private val signMapper: SignMapper,
    private val objectMapper: ObjectMapper,
): ServiceImpl<SignMapper, Sign>(), SignService {

    override fun submit(signRequest: SignRequest): Unit {
        val queryWrapper = QueryWrapper.create()
            .where(SIGN.STU_ID.eq(signRequest.stuId))

        signMapper.selectOneByQuery(queryWrapper)?.let {
            throw BusinessException("该学号已提交过该表")
        }

        Sign(
            name = signRequest.name,
            stuId = signRequest.stuId,
            department = signRequest.department,
            major = signRequest.major,
            grade = signRequest.grade,
            qq = signRequest.qq,
            groups = objectMapper.writeValueAsString(signRequest.groups),
            experience = signRequest.experience,
            intro = signRequest.intro
        ).also { signMapper.insertSelective(it) }
    }
}
