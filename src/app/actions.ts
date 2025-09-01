
'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';

const EmailSchema = z.string().email({ message: "Please enter a valid email address." });

export async function addEarlyAccessUser(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const validation = EmailSchema.safeParse(email);

  if (!validation.success) {
    return {
      message: validation.error.errors[0].message,
      success: false,
    };
  }

  try {
    const earlyAccessCollection = collection(db, 'earlyAccessUsers');
    
    // Check if email already exists
    const q = query(earlyAccessCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return {
            message: "You're already on the list! We'll keep you posted.",
            success: true,
        };
    }

    await addDoc(earlyAccessCollection, {
      email: email,
      signedUpAt: serverTimestamp(),
    });

    return {
      message: "Thanks for joining! You're on the list. We'll be in touch.",
      success: true,
    };
  } catch (error) {
    console.error('Firestore error:', error);
    return {
      message: "Something went wrong. Please try again later.",
      success: false,
    };
  }
}

export async function getEarlyAccessUserCount() {
    try {
        const earlyAccessCollection = collection(db, 'earlyAccessUsers');
        const snapshot = await getDocs(earlyAccessCollection);
        return snapshot.size;
    } catch (error) {
        console.error("Failed to fetch user count:", error);
        return 5000; // Return a default/fallback value
    }
}

    