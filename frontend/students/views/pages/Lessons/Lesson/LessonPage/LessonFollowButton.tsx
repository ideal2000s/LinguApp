import React from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, ConnectedProps } from 'react-redux';
import { Translate } from 'i18n';
import { tAppState } from 'students/stores/rootStore';
import { authActions } from 'students/stores/auth';
import { lessonSelectors, toggleFollowTeam } from 'students/stores/lesson';
import { SLessonSubscribeButton } from './styled';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import subIcon from 'students/views/shared/assets/icons/sub_icon.svg';

type tProps = ConnectedProps<typeof connector>;

const LessonFollowButton: React.FC<tProps> = ({
  lesson,
  toggleFollowTeam,
  needAuthCheck
}) => {
  if (!lesson) return null;

  const { team } = lesson;

  const handleSubscribe = () => {
    if (team) {
      needAuthCheck(async () => {
        return toggleFollowTeam({
          teamId: team.id,
          follow: !team.isFollowing
        });
      });
    }
  };

  return (
    <SLessonSubscribeButton onClick={handleSubscribe} isFollowing={team?.isFollowing}>
      {team?.isFollowing ? (
        <FontAwesomeIcon icon={faCheck} size="xs" />
      ) : (
        <UrlIcon url={subIcon} height="1.25rem" width="1.25rem" color="#ffffff" />
      )}

      <Translate
        str={`frontend.lesson_page.${team?.isFollowing ? 'followed' : 'subscribe'}`}
      />
    </SLessonSubscribeButton>
  );
};

const mapStateToProps = (state: tAppState) => {
  return {
    lesson: lessonSelectors.selectLesson(state)
  };
};

const mapDispatchToProps = {
  toggleFollowTeam,
  needAuthCheck: authActions.needAuthCheck
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LessonFollowButton);
