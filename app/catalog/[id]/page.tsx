import CamperDetailsClient from "./page.client";
import Gallery from "@/components/Gallery/Gallery";
import styles from "./page.module.css";
import { getCamperReviews, getCamperById } from "@/lib/api/clientApi";
import { notFound } from "next/navigation";
import { Icon } from "../page.client";
interface NotesFilterPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CamperDetails(props: NotesFilterPageProps) {
  const { id } = await props.params;
  let camper;

  try {
    camper = await getCamperById(id);
  } catch {
    notFound();
  }

  const camperReviews = await getCamperReviews(id);

  return (
    <div className="container">
      <div className={styles.container}>
        <div className={styles.sectionCamper}>
          <div className={styles.gallery}>
            <Gallery images={camper.gallery} camperName={camper.name} />
          </div>
          <div className={styles.blockAbout}>
            <div className={styles.describe}>
              <h2 className={styles.headerAbout}>{camper.name}</h2>
              <div className={styles.cardMeta}>
                <div className={styles.metaRow}>
                  <span>
                    <Icon name="card-rating" className={styles.ratingIcon} />
                    {camper.rating.toFixed(1)} ({camper.totalReviews} Reviews)
                  </span>
                  <span>
                    <Icon name="map-pin" className={styles.mapPin} />{" "}
                    {camper.location}
                  </span>
                </div>
                <p className={styles.price}>€{camper.price}</p>
                <p className={styles.describeDescribe}>{camper.description}</p>
              </div>
            </div>
            <div className={styles.about}>
              <h2 className={styles.headerAbout}>Vehicle details</h2>
              <ul className={styles.aboutPrivilage}>
                {camper.amenities.map((amenity) => (
                  <li key={amenity}>{amenity}</li>
                ))}
              </ul>
              <div className={styles.aboutContainer}>
                <div className={styles.aboutExample}>
                  <p>Form</p>
                  <p>Length</p>
                  <p>Width</p>
                  <p>Height</p>
                  <p>Tank</p>
                  <p>Consumption</p>
                </div>
                <div className={styles.aboutForExample}>
                  <p>{camper.form}</p>
                  <p>{camper.length}</p>
                  <p>{camper.width}</p>
                  <p>{camper.height}</p>
                  <p>{camper.tank}</p>
                  <p>{camper.consumption}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.sectionReviews}>
          <h2 className={styles.reviewsHeader}>Reviews</h2>
          <div className={styles.sectionReviewsContainer}>
            <div className={styles.reviews}>
              <ul className={styles.reviewsList}>
                {camperReviews.map((review) => (
                  <li key={review.id} className={styles.reviewsContent}>
                    <div className={styles.containerReviewer}>
                      <div className={styles.avatar}>
                        {review.reviewer_name[0]}
                      </div>
                      <div className={styles.reviewer}>
                        <h3 className={styles.reviewerName}>
                          {review.reviewer_name}
                        </h3>
                        <span className={styles.rate}>
                          {Array.from({ length: 5 }, (_, index) => (
                            <Icon
                              key={index}
                              name="card-rating"
                              className={
                                index <
                                Math.min(
                                  5,
                                  Math.max(
                                    0,
                                    Math.round(review.reviewer_rating),
                                  ),
                                )
                                  ? styles.ratingIcon
                                  : styles.ratingIconEmpty
                              }
                            />
                          ))}
                        </span>
                      </div>
                    </div>
                    <p className={styles.reviewerComment}>{review.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.book}>
              <h2 className={styles.bookHeader}>Book your campervan now</h2>
              <p className={styles.bookText}>
                Stay connected! We are always ready to help you.
              </p>
              <CamperDetailsClient id={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
