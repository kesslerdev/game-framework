import { createSelector } from 'reselect'

const getInerBag = (resourceBag) => resourceBag.innerBag
const getRef = (resourceBag, resource) => resource

export const getResourceSlot = createSelector(
  [getInerBag, getRef],
  (innerBag, ref) => innerBag.find(
    (slot) => slot.resource.slug === ref.slug && slot.resource.typeName === ref.typeName
  )
)
