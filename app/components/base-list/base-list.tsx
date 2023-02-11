import { Placeholder } from "components/placeholder/placeholder"
import { Divider, FlatList } from "native-base"
import { IFlatListProps } from "native-base/lib/typescript/components/basic/FlatList"
import * as React from "react"

export interface BaseListProps<T> extends IFlatListProps<T> {

}

/**
 * Describe your component here
 */
export function BaseList<T>({ ...rest }: BaseListProps<T>) {


  return (
    <FlatList ItemSeparatorComponent={() => <Divider mb='2' />}  ListEmptyComponent={<Placeholder />} {...rest} />
  )
}
