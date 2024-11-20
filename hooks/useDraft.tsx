import { useMemo } from "react"
import { useAppSelector } from "./store"

/**
 * get draft ✔
 */
export const useDraft = () => {

    const draft = useAppSelector(state => state.post.draft)

    return useMemo(() => draft, [draft])
}