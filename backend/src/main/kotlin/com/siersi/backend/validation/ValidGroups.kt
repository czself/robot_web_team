package com.siersi.backend.validation

import com.siersi.backend.constant.SignGroups
import jakarta.validation.Constraint
import jakarta.validation.ConstraintValidator
import jakarta.validation.ConstraintValidatorContext
import jakarta.validation.Payload
import kotlin.reflect.KClass

/**
 * 校验字符串集合中的每个值都在预设组别内，空集合由 @NotEmpty 负责。
 */
@Target(AnnotationTarget.FIELD, AnnotationTarget.VALUE_PARAMETER, AnnotationTarget.PROPERTY_GETTER)
@Retention(AnnotationRetention.RUNTIME)
@MustBeDocumented
@Constraint(validatedBy = [GroupsValidator::class])
annotation class ValidGroups(
    val message: String = "组别只能是：电控、机械、算法、硬件、运营",
    val groups: Array<KClass<*>> = [],
    val payload: Array<KClass<out Payload>> = []
)

class GroupsValidator : ConstraintValidator<ValidGroups, List<String>> {

    override fun isValid(value: List<String>?, context: ConstraintValidatorContext): Boolean {
        if (value.isNullOrEmpty()) return true
        return value.all { it in SignGroups.ALL }
    }
}
