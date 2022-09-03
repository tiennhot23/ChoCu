import {ConfirmDialog, Icon, ModalLoading} from '@components'
import React, {useEffect, useState} from 'react'
import {Platform, Text, TouchableOpacity, View} from 'react-native'
import {CHAT_BOX_SCR, CREATE_DEAL_SCR} from 'src/constants/constant'
import {Linking} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {
  approvePost,
  deletePost,
  denyPost
} from 'src/containers/AdminPostsManager/action'
import {helper} from '@common'
import {removePostReports} from 'src/containers/AdminReportManager/action'

export default function BottomAdminButtons({
  theme,
  navigation,
  onActionDone,
  hasReports
}) {
  const post = useSelector((state) => state.postReducer.dataPost.post)
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmTitle, setConfirmTitle] = useState('')
  const [confirmDesc, setConfirmDesc] = useState('')
  const [confirmAction, setConfirmAction] = useState('')
  const isActioning = useSelector(
    (state) => state.adminPostsManagerReducer.isActioning
  )
  let jump = false
  const dispatch = useDispatch()
  // useEffect(() => {
  //   if (isActionDone) {
  //     if (helper.isFunction(onActionDone) && jump) onActionDone()
  //   }
  // }, [isActionDone])

  return (
    <View
      style={{
        height: '8%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: 'white'
      }}>
      <ConfirmDialog
        show={showConfirm}
        title={confirmTitle}
        description={confirmDesc}
        withMessage={confirmAction === 'deny' ? true : false}
        onCanceled={() => setShowConfirm(false)}
        onConfirmed={(message) => {
          if (confirmAction === 'deny') {
            dispatch(denyPost({post_id: post.post_id, reason: message}))
          } else if (confirmAction === 'approve') {
            dispatch(approvePost({post_id: post.post_id}))
          } else if (confirmAction === 'delete') {
            if (hasReports) dispatch(removePostReports({post_id: post.post_id}))
            dispatch(deletePost({post_id: post.post_id}))
          } else if (confirmAction === 'clearReports') {
            dispatch(removePostReports({post_id: post.post_id}))
            navigation.goBack()
          }
        }}
      />
      <ModalLoading loading={isActioning} />

      {post?.post_state === 'pending' ? (
        <>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              flex: 1,
              height: '100%',
              backgroundColor: '#dbdbdb',
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => {
              jump = false
              setShowConfirm(true)
              setConfirmTitle('Từ chối bài đăng')
              setConfirmDesc('')
              setConfirmAction('deny')
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontWeight: '800',
                letterSpacing: 1,
                marginLeft: 5,
                color: theme.primaryText,
                textTransform: 'uppercase'
              }}>
              {'Từ chối'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              flex: 1,
              height: '100%',
              backgroundColor: '#090909',
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => {
              jump = true
              setShowConfirm(true)
              setConfirmTitle('Duyệt bài đăng')
              setConfirmDesc('')
              setConfirmAction('approve')
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontWeight: '800',
                letterSpacing: 1,
                marginLeft: 5,
                color: 'white',
                textTransform: 'uppercase'
              }}>
              {'Duyệt'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              flex: 1,
              height: '100%',
              backgroundColor: '#dbdbdb',
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => {
              jump = true
              setShowConfirm(true)
              setConfirmTitle('Xoá khiếu nại')
              setConfirmDesc('Xoá toàn bộ khiếu nại của bài đăng này')
              setConfirmAction('clearReports')
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontWeight: '800',
                letterSpacing: 1,
                marginLeft: 5,
                color: 'black',
                textTransform: 'uppercase'
              }}>
              {'Xoá khiếu nại'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              flex: 1,
              height: '100%',
              backgroundColor: '#090909',
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => {
              jump = true
              setShowConfirm(true)
              setConfirmTitle('Xoá bài đăng')
              setConfirmDesc(
                'Xoá bài đăng khỏi bảng tin cùng toàn bộ khiếu nại của bài đăng này'
              )
              setConfirmAction('delete')
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontWeight: '800',
                letterSpacing: 1,
                marginLeft: 5,
                color: 'white',
                textTransform: 'uppercase'
              }}>
              {'Khoá bài đăng'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}
