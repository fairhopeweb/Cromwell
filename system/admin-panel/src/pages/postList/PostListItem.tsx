import { TPost } from '@cromwell/core';
import { Grid, IconButton } from '@material-ui/core';
import { DeleteForever as DeleteForeverIcon, Edit as EditIcon } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';

import { postPageInfo } from '../../constants/PageInfos';
import styles from './PostList.module.scss';

type TPostListItemProps = {
    data?: TPost;
}

export const PostListItem = (props: TPostListItemProps) => {
    // console.log('PostListItem::props', props)
    return (
        <Grid container className={styles.listItem}>
            {props.data && (
                <>
                    <Grid xs={5} className={styles.itemMain}>
                        <div
                            style={{ backgroundImage: `url(${props?.data?.mainImage})` }}
                            className={styles.itemImage}
                        ></div>
                        <div className={styles.itemMainInfo}>
                            <p className={styles.itemTitle}>{props.data?.title}</p>
                            <p className={styles.itemAuthor}>by <span style={{ fontWeight: 500 }}>{props.data?.author?.fullName}</span></p>
                        </div>
                    </Grid>
                    <Grid xs={1}>

                    </Grid>
                    <Grid xs={2} className={styles.itemSubInfo}>
                        <p className={styles.itemPublished}>{props.data?.isPublished ? 'published' : 'draft'}</p>
                        <p className={styles.itemCreate} >{toLocaleDateString(props.data?.createDate)}</p>
                    </Grid>
                    <Grid xs={4} className={styles.listItemActions}>
                        <Link to={`${postPageInfo.baseRoute}/${props.data?.id}`}>
                            <IconButton
                                aria-label="edit"
                            >
                                <EditIcon />
                            </IconButton>
                        </Link>
                        <IconButton
                            aria-label="delete"
                        >
                            <DeleteForeverIcon />
                        </IconButton>
                    </Grid>
                </>
            )}
        </Grid>
    )
}

const toLocaleDateString = (date: Date | string | undefined) => {
    if (!date) return '';
    if (typeof date === 'string') date = new Date(date);
    return date.toLocaleDateString();
}