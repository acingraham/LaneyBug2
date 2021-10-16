import boto3
import os

s3 = boto3.resource('s3')
bucket = s3.Bucket('laneybug')

# Fetch videos in s3
existing_videos = set()
for object_summary in bucket.objects.filter(Prefix="videos/"):
    video = object_summary.key.rsplit('/', 1)[-1]
    existing_videos.add(video)

# Fetch videos in local 'videos' directory
local_videos = set(os.listdir('./videos'))

# Identify local videos not in s3
videos_not_in_s3 = []
for video in local_videos:
    if video not in existing_videos:
        videos_not_in_s3.append(video)

# Print 
print(len(existing_videos), 'existing videos')
print(len(local_videos), 'local videos')
print(len(videos_not_in_s3), 'local videos not in s3 to upload')

# Upload local videos not in s3
# TODO - Could mess around and make this a commandline tool w/ a spinning upload progress status. Would mostly just be a learning experience.
for video in videos_not_in_s3:
    # TODO - Add error handling
    print(video)
    bucket.upload_file('./videos/' + video, 'videos/' + video)
